import { GroupOutlined, HomeOutlined } from '@ant-design/icons';

interface SubItem {
  key: string;
  title: string;
  url: string;
}

interface SideMenu {
  key: string;
  title: string;
  icon: any;
  url?: string;
  subItem?: Array<SubItem>;
}

export const menu: Array<SideMenu> = [
  {
    key: '1',
    title: 'Home',
    icon: <HomeOutlined />,
    url: '/',
  },
  {
    key: 'location',
    title: 'Location',
    icon: <GroupOutlined />,
    subItem: [
      {
        key: '3',
        title: 'Province',
        url: '/location/province',
      },
      {
        key: '4',
        title: 'District',
        url: '/location/district',
      },
      {
        key: '5',
        title: 'Alex',
        url: '/',
      },
    ],
  },
  {
    key: '6',
    title: 'Test',
    icon: <HomeOutlined />,
    url: '/test',
  },
];
