export default interface PesquisaFiltro {
  campo: string;
  valor: string | number | boolean | Array<string> | null | undefined;
}
