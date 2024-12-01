import { getPageBySlug } from "@/utils/contentful"

export type NavItem = {
  title: string
  href: string
  children?: NavItem[]
  icon?: string
}

export const navMap: NavItem[] = [
  {
    title: 'Etusivu',
    href: '',
  },
  {
    title: 'Pedagogiikka',
    href: '',
    children: [
      {
        title: 'Kamupeda',
        href: '',
      },
      {
        title: 'Kansanmusiikkipedagogiikka',
        href: '',
      },
      {
        title: 'Harjoituksia',
        href: '',
      },
      {
        title: 'Musiikin Hahmotusaineet',
        href: '',
      },
    ]
  },
  {
    title: 'Materiaalit',
    href: '/blog',
    children: [
      {
        title: 'Kamutaito 1',
        href: '',
      },
      {
        title: 'Instrumentit',
        href: '',
      },
      {
        title: 'Yhteismusisointi',
        href: '',
      },
      {
        title: 'Tanssi',
        href: '',
      },
    ]
  },
  {
    title: 'Blogi',
    href: '',
  },
  {
    title: 'Linkit',
    href: '',
  },
  {
    title: 'Yhteystiedot',
    href: '',
  },
  {
    title: 'In English',
    href: '',
  }
]

const getIconUrl = async (title: string) => {
  const pageData = await getPageBySlug(title)

  if (!pageData?.fields?.icon) return null

  // @ts-expect-error expect this because of contentful data structure
  return 'https:' + pageData.fields.icon.fields.file.url
}

export const navMapWithIcons = async () => {
  const updatedNavMap = await Promise.all(navMap.map(async (item) => {
    const childrenWithIcons = item.children 
      ? await Promise.all(item.children.map(async (child) => ({
          ...child,
          icon: await getIconUrl(child.title)
        })))
      : null;

    return {
      ...item,
      // icon: await getIconUrl(item.title),
      children: childrenWithIcons
    }
  }));

  return updatedNavMap;
}
