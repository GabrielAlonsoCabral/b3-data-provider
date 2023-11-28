import { ITrade } from ".";

export function parseLine(line: string): ITrade {
  const values = line.split(';');
  const trade: ITrade = {} as ITrade;

  const header = [
    'DataReferencia',
    'CodigoInstrumento',
    'AcaoAtualizacao',
    'PrecoNegocio',
    'QuantidadeNegociada',
    'HoraFechamento',
    'CodigoIdentificadorNegocio',
    'TipoSessaoPregao',
    'DataNegocio',
    'CodigoParticipanteComprador',
    'CodigoParticipanteVendedor',
  ];

  for (let i = 0; i < header.length; i++) {
    trade[header[i]] = values[i];
  }

  return trade;
}