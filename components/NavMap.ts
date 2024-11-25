export type NavItem = {
  title: string
  href: string
  children?: NavItem[]
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
