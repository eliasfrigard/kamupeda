export type NavItem = {
  title: string
  href: string
  children?: NavItem[]
}

export const navMap: NavItem[] = [
  {
    title: 'etusivu',
    href: '',
  },
  {
    title: 'pedagogiikka',
    href: '',
    children: [
      {
        title: 'kamupeda',
        href: '',
      },
      {
        title: 'kansanmusiikkipedagogiikka',
        href: '',
      },
      {
        title: 'harjoituksia',
        href: '',
      },
      {
        title: 'musiikin hahmotusaineet',
        href: '',
      },
    ]
  },
  {
    title: 'materiaalit',
    href: '/blog',
    children: [
      {
        title: 'kamutaito-1',
        href: '',
      },
      {
        title: 'instrumentit',
        href: '',
      },
      {
        title: 'yhteismusisointi',
        href: '',
      },
      {
        title: 'tanssi',
        href: '',
      },
    ]
  },
  {
    title: 'blogi',
    href: '',
  },
  {
    title: 'linkit',
    href: '',
  },
  {
    title: 'yhteystiedot',
    href: '',
  },
  {
    title: 'in english',
    href: '',
  }
]
