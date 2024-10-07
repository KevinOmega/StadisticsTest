import { zValues } from './z-table';
import { chiSquareTable } from './chi';

const types = [
    {
        id: 1,
        name: "Prueba de los promedios"
    },
    {
        id: 2,
        name: "Prueba de la frecuencia"
    },
    {
        id: 3,
        name: "Prueba de Kolmogorov Smirnov"
    },
    {
        id: 4,
        name: "Prueba de las series"
    },
    {
        id: 5,
        name: "Prueba del poker"
    }
]


const normalTest = (data,options) => {
    const average = data.reduce((acc, num) => acc + num, 0) / data.length;
    
    console.log("Average: ",average);
    const calculatedStatistic = ((0.5 - average) * (Math.sqrt(data.length) )) / (Math.sqrt(1/12));

    console.log("Calculated Statistic: ",calculatedStatistic);

    const zscore = 1 - options.alpha / 2;
    console.log("ZScore",zscore);

    let theoricStatistic = 0;
    Object.keys(zValues).map(key => {
        Object.keys(zValues[key]).map(key2 => {
            if (zValues[key][key2] === zscore) {
                theoricStatistic = Number(key2) + Number(key);
            }
        })
        return key;
    });

    console.log("Theoric Statistic: ",theoricStatistic);

    let isUniform = false;
    if(calculatedStatistic < theoricStatistic){
        isUniform = true;
    }

    
    const results = [
        {title: "Promedio", value: average},
        {title: "Estadistico calculado", value: calculatedStatistic},
        {title: "Valor Z", value: zscore},
        {title: "Estadistico teorico", value: theoricStatistic},
        {title: "Es uniforme", value: isUniform ? "Verdadera" : "Falso"}    
]
    
    return results;
}

const frecuencyTest = (data,options) => {

    const hopeFrecuency = options.k / data.length;

    const observedFrecuency = {1: 0, 2: 0, 3: 0,4: 0}

    data.forEach(num => {
        if(num > 0 && num < 0.25){
            observedFrecuency[1]++;
        }else if(num >= 0.25 && num < 0.5){
            observedFrecuency[2]++; 
        }else if(num >= 0.5 && num < 0.75){
            observedFrecuency[3]++; 
        }else if(num >= 0.75 && num <= 1){
            observedFrecuency[4]++; 
        }
    })

    let calculatedStatistic  = 0;

     Object.keys(observedFrecuency).forEach(key => {
        const iObserved = observedFrecuency[key];
        
        calculatedStatistic += (hopeFrecuency - iObserved )/ hopeFrecuency
        
    })

    const theoricStatistic = chiSquareTable[options.alpha][options.k - 1];

    const isTrue = calculatedStatistic < theoricStatistic;

    const results = [
        {title: "Frecuencia Esperada", value: hopeFrecuency},
        {title: "Frecuencia Observada", value: observedFrecuency},
        {title: "Estadistico calculado", value: calculatedStatistic},
        {title: "Estadistico teorico", value: theoricStatistic},
        {title: "Es uniforme", value: isTrue ? "Verdadero" : "Falso"}

    ]

    return results;
}


const calculate = (type, data, options) => {
    const dataAsNumber = data.map(num => Number(num));
    
    
    let results;
    switch (type) {
        case 1:
            results = normalTest(dataAsNumber,options);
            break;
        case 2:
            results = frecuencyTest(dataAsNumber,options);
            break;
        default:
            console.log("No se encontro el tipo de prueba")
            break;
    }
    return results;
}

export {types,calculate}