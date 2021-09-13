export default (req: any, res: any) => {
  res.render("error/404", { title: "404 | СТРАНИЦА НЕ НАЙДЕНА" });
};
