import i18n from '@/locales/i18n';
import { useAppStore } from '@/store/appStore';
import { ElMessage } from 'element-plus';
import { reactive, readonly } from 'vue';
import { scrollIntoView } from '@/utils/scrollIntoView';

export interface IMemu {
  id: number;
  name: string;
  logo: any;
  link?: string;
  urlName: string;
  active: boolean;
  children?: IMemu[];
}

// 菜单列表
const menuListValue = reactive<IMemu[]>([
  {
    id: 1,
    name: 'base.3',
    logo: require('@img/holder.png'),
    urlName: 'home',
    active: false
  },
  {
    id: 2,
    name: 'base.19',
    link: 'https://kilien.github.io',
    logo: require('@img/holder.png'),
    urlName: '/',
    active: false
  },
  {
    id: 3,
    name: 'base.4',
    logo: require('@img/holder.png'),
    urlName: '#About',
    active: false
  },
  {
    id: 4,
    name: 'base.20',
    logo: require('@img/holder.png'),
    urlName: '#Project',
    active: false
  },
  {
    id: 5,
    name: 'base.21',
    logo: require('@img/holder.png'),
    urlName: '#Footer',
    active: false
  }
]);

/**
 * 修改菜单
 * @param menuItem 菜单项
 */
export function setMenuList(menuItem) {
  menuListValue.forEach(item => {
    if (menuItem.id === item.id) {
      item = menuItem;
    }
  });
}

export const useTopBar = () => {
  const appStore = useAppStore();
  const router = useRouter();
  const $t = i18n.global.t;

  const gThis = getCurrentInstance().appContext.config.globalProperties;

  const loadLink = ref(false);
  /**
   * 连接钱包
   */
  async function handleLink() {
    if (loadLink.value) return;
    loadLink.value = true;
    await appStore.linkWallet();
    loadLink.value = false;
  }

  // 语言栏
  const langList = reactive([
    {
      id: 1,
      name: '中文',
      target: 'cn',
      active: true
    },
    {
      id: 2,
      name: 'English',
      target: 'en',
      active: false
    }
  ]);

  // 当前选中语言
  const curLang = computed(() => langList.find(item => item.target === appStore.curLang).name);

  /**
   * 路由跳转
   * @param {Object} item
   */
  function launchTo(item) {
    // 外链跳转
    if (item.link) {
      window.open(item.link);
      return;
    }

    if (item.urlName === '' || item.urlName === '/') {
      ElMessage({
        type: 'info',
        message: $t('base.2')
      });
      return;
    }

    if (item.urlName.includes('#')) {
      scrollIntoView(item.urlName);
      return;
    }

    // 组件跳转
    if (item.urlName !== '/') {
      router.push({ name: item.urlName });
    }
  }

  /**
   * 选择语言
   */
  function pickLang(lang) {
    gThis.$i18n.locale = lang.target;
    appStore.setLang(lang.target);
    langList.forEach(item => {
      item.active = lang.id === item.id;
    });
  }

  return {
    langList,
    curLang,
    loadLink,
    pickLang,
    launchTo,
    handleLink
  };
};

export const menuList = readonly(menuListValue);
