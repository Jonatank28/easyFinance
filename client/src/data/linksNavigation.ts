export type LinksTypes = {
  name: string;
  route: string;
};

export const links: LinksTypes[] = [
  {
    name: "Dashboard",
    route: "/dashboard",
  },
  {
    name: "Transação",
    route: "/transaction",
  },
  {
    name: "Assinatura",
    route: "/subscription",
  },
  {
    name: "Configurações",
    route: "/settings",
  },
];
