const moment = require('moment');

/* Valores que podem ser alterados para simular várias hipóteses */
const dataEvento = '15/12/2021 18:30';
const diasAntecedenciaFornecedor = 2; //PFF
let numeroParcelasPacote = 5;
const dataGeracaoGuia = '15/12/2021 10:30';

console.log(`A guia foi gerada em: ${dataGeracaoGuia}`);
console.log(`O evento vai acontecer em: ${dataEvento}`);
console.log(`Fornecedor espera o seu pagamento total até ${diasAntecedenciaFornecedor} dia(s) antes da realização do evento`);

const tempoRealizacaoEvento = moment.duration(moment(dataEvento, "DD/MM/YYYY HH:mm").diff(moment(dataGeracaoGuia, "DD/MM/YYYY HH:mm"))).asHours(); //TRE

console.log(`Tempo que resta para acontecer o evento: ${tempoRealizacaoEvento} horas, equivalente a ${tempoRealizacaoEvento / 24} dias`);

/* Primeiro caso a ser analisado, quando o tempo que resta para realização do evento for menor ou igual 
ao tempo definido pelo fornecedor para receber todo seu pagamento por determinado serviço */
if (tempoRealizacaoEvento <= (diasAntecedenciaFornecedor * 24)) {
    console.log('***************************** CASO 1 *******************************************');

    numeroParcelasPacote = 1;
    console.log(`O evento será pago em ${numeroParcelasPacote} parcela`);

    if (tempoRealizacaoEvento < 48) {
        const prazoPagamentoParcela = moment(dataGeracaoGuia, "DD/MM/YYYY HH:mm").add(0.3 * tempoRealizacaoEvento, 'hours');

        console.log(`Esta parcela tem de ser paga em até ${0.3 * tempoRealizacaoEvento} horas`);
        console.log(`O pagamento da parcela tem de ser efetuado em até: ${prazoPagamentoParcela}`);
    }

    //168 horas equivale a 7 dias (1 semana)
    if (tempoRealizacaoEvento >= 48 && tempoRealizacaoEvento <= 168) {
        const prazoPagamentoParcela = moment(dataGeracaoGuia, "DD/MM/YYYY HH:mm").add(24, 'hours');

        console.log(`Esta parcela tem de ser paga em até 24 horas`);
        console.log(`O pagamento da parcela tem de ser efetuado em até: ${prazoPagamentoParcela}`);
    }

    if (tempoRealizacaoEvento > 168) {
        const prazoPagamentoParcela = moment(dataGeracaoGuia, "DD/MM/YYYY HH:mm").add(48, 'hours');

        console.log(`Esta parcela tem de ser paga em até 48 horas`);
        console.log(`O pagamento da parcela tem de ser efetuado em até: ${prazoPagamentoParcela}`);
    }
}

/* Segundo caso a ser analisado, quando o tempo que resta para realização do evento for superior 
ao tempo definido pelo fornecedor para receber todo seu pagamento por determinado serviço */
if (tempoRealizacaoEvento > (diasAntecedenciaFornecedor * 24)) {

    console.log('***************************** CASO 2 *******************************************');
    const quantidadeTempoParaPagamento = ((tempoRealizacaoEvento / 24) - diasAntecedenciaFornecedor) * 24;
    console.log(`Cliente tem ${quantidadeTempoParaPagamento} hora(s), equivalente a ${quantidadeTempoParaPagamento / 24} dia(s) para fazer o pagamento total`);

    if (quantidadeTempoParaPagamento <= 168) {
        numeroParcelasPacote = 1;
        console.log(`O evento será pago em ${numeroParcelasPacote} parcela`);

        if (tempoRealizacaoEvento < 48) {
            const prazoPagamentoParcela = moment(dataGeracaoGuia, "DD/MM/YYYY HH:mm").add(0.3 * tempoRealizacaoEvento, 'hours');

            console.log(`Esta parcela tem de ser paga em até ${0.3 * tempoRealizacaoEvento} horas`);
            console.log(`O pagamento da parcela tem de ser efetuado em até: ${prazoPagamentoParcela}`);
        }

        if (tempoRealizacaoEvento >= 48 && tempoRealizacaoEvento <= 168) {
            const prazoPagamentoParcela = moment(dataGeracaoGuia, "DD/MM/YYYY HH:mm").add(24, 'hours');

            console.log(`Esta parcela tem de ser paga em até 24 horas`);
            console.log(`O pagamento da parcela tem de ser efetuado em até: ${prazoPagamentoParcela}`);
        }

        if (tempoRealizacaoEvento > 168) {
            const prazoPagamentoParcela = moment(dataGeracaoGuia, "DD/MM/YYYY HH:mm").add(48, 'hours');

            console.log(`Esta parcela tem de ser paga em até 48 horas`);
            console.log(`O pagamento da parcela tem de ser efetuado em até: ${prazoPagamentoParcela}`);
        }
    }

    //720 horas equivale a 30 dias
    if (quantidadeTempoParaPagamento >= 168 && quantidadeTempoParaPagamento <= 720) {
        numeroParcelasPacote = 2;
        console.log(`O evento será pago em ${numeroParcelasPacote} parcelas até ${moment(dataEvento, "DD/MM/YYYY HH:mm").subtract(diasAntecedenciaFornecedor, 'days')} `);

        const prazoPagamentoParcela1 = moment(dataGeracaoGuia, "DD/MM/YYYY HH:mm").add(48, 'hours');
        console.log(`A primeira parcela será paga em até 48 horas`);
        console.log(`O pagamento da primeira parcela tem de ser efetuado em até: ${prazoPagamentoParcela1}`);

        const prazoPagamentoParcela2 = moment(prazoPagamentoParcela1, "DD/MM/YYYY HH:mm").add((quantidadeTempoParaPagamento - 48), 'hours');
        console.log(`A segunda parcela será paga em até ${quantidadeTempoParaPagamento - 48} horas depois do prazo da primeira parcela `);
        console.log(`O pagamento da segunda parcela tem de ser efetuado em até: ${prazoPagamentoParcela2}`);
    }

    if (quantidadeTempoParaPagamento > 720) {
        console.log(`O evento será pago em ${numeroParcelasPacote} parcelas até ${moment(dataEvento, "DD/MM/YYYY HH:mm").subtract(diasAntecedenciaFornecedor, 'days')} `);

        const prazoPagamentoParcela1 = moment(dataGeracaoGuia, "DD/MM/YYYY HH:mm").add(48, 'hours');
        console.log(`A primeira parcela será paga em até 48 horas`);
        console.log(`O pagamento da primeira parcela tem de ser efetuado em até: ${prazoPagamentoParcela1}`);


        for (let i = 2; i <= numeroParcelasPacote; i++) {
            let prazoPagamentoParcela;
            const x = (quantidadeTempoParaPagamento - 48) / (numeroParcelasPacote - 1);

            if (i === 2) {
                prazoPagamentoParcela = (moment(prazoPagamentoParcela1, "DD/MM/YYYY HH:mm").add((x), 'hours'));

                console.log(`A ${i}ª parcela será paga em até ${x} depois do prazo da ${i-1}ª parcela`);
                console.log(`O pagamento da ${i}ª parcela tem de ser efetuado em até: ${prazoPagamentoParcela}`);
            } else {
                prazoPagamentoParcela = (moment(prazoPagamentoParcela, "DD/MM/YYYY HH:mm").add((x), 'hours'));

                console.log(`A ${i}ª parcela será paga em até ${x} depois do prazo da ${i-1}ª parcela`);
                console.log(`O pagamento da ${i}ª parcela tem de ser efetuado em até: ${prazoPagamentoParcela}`);
            }

        }
    }
}