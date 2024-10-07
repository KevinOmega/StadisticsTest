import { zValues } from './z-table';
import { chiSquareTable } from './chi';
import { ksTable } from './ks';

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

    let observedFrecuencyResults = "";
     Object.keys(observedFrecuency).forEach(key => {
        observedFrecuencyResults += `[${key}: ${observedFrecuency[key]}]\n`
    })

    const results = [
        {title: "Frecuencia Esperada", value: hopeFrecuency},
        {title: "Frecuencia Observada", value: observedFrecuencyResults},
        {title: "Estadistico calculado", value: calculatedStatistic},
        {title: "Estadistico teorico", value: theoricStatistic},
        {title: "Es uniforme", value: isTrue ? "Verdadero" : "Falso"}

    ]

    return results;
}

const kolmogorovSmirnov = (data,options) => {
    const n = data.length;

    const sortedData = data.sort((a, b) => a - b);

    const  FI = sortedData.map((x,i) => (i+1)/n);

    const FII = [...sortedData];

    const FI_less_FII = FI.map((x,i) => {
        return FII[i] - x;
    })

    console.log(FI,FII,FI_less_FII);

    const d_max = Math.max(...FI_less_FII).toFixed(2);
    const ks = ksTable[options.alpha][n];

    const isTrue = d_max < ks;

    const results = [
        {title: "Estadistico calculado(dMax)", value: d_max},
        {title: "Estadistico teorico(ks)", value: ks},
        {title: "Es uniforme", value: isTrue ? "Verdadero" : "Falso"}

    ]
    return results;
}


const seriesTest = (data,options) => {
    const orderPairs = [];

    for (let i = 0; i < data.length - 1; i++) {
        orderPairs.push([data[i], data[i + 1]]);
    }

    const n = orderPairs.length;

    const hopeFrecuency = (n) / Math.pow(options.k,2);

    

    const observedFrecuency = {
        1: {
            1: 0,
            2: 0,
            3: 0,
            4: 0
        },
        2: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
        },
        3: {
            1: 0,
            2: 0,
            3: 0,
            4: 0
        },
        4: {
            1: 0,
            2: 0,
            3: 0,
            4: 0
        }
    };

    orderPairs.forEach(pair => {
        const iValue = pair[0];
        const jValue = pair[1];
        
        for(let i = 0; i < 4; i++){
            if(iValue >= i * 0.25 && iValue < (i+1) * 0.25){
                for(let j = 0; j < 4; j++){
                    if(jValue >= j* 0.25 && jValue < (j+1) * 0.25){
                        observedFrecuency[i+1][j+1]++;
                    }
                }
            }  
        }
            
    });


    let calculatedStatistic  = 0;

     Object.keys(observedFrecuency).forEach(key => {
        Object.keys(observedFrecuency[key]).forEach(key2 => {
            console.log((n / Math.pow(options.k,2)) - observedFrecuency[key][key2]);
            calculatedStatistic += Math.pow(((n / Math.pow(options.k,2)) - observedFrecuency[key][key2]),2);
        })
     });

     calculatedStatistic *= (Math.pow(options.k,2) / n);


     const theoricStatistic = chiSquareTable[options.alpha][Math.pow(options.k,2) - 1];

     const isTrue = calculatedStatistic < theoricStatistic;

     let observedFrecuencyResults = "";
     Object.keys(observedFrecuency).forEach(key => {
        observedFrecuencyResults+= `{${key}:\n`
        Object.keys(observedFrecuency[key]).forEach(key2 => {
            observedFrecuencyResults += `[${key2}: ${observedFrecuency[key][key2]}],`;
        })
        observedFrecuencyResults += `}\n`;
    })

     const results = [
        {title: "Frecuencia Esperada", value: hopeFrecuency},
        {title: "Frecuencia Observada", value: observedFrecuencyResults},
        {title: "Estadistico calculado", value: calculatedStatistic},
        {title: "Estadistico teorico", value: theoricStatistic},
        {title: "Es independiente", value: isTrue ? "Verdadero" : "Falso"}

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
        case 3:
            results = kolmogorovSmirnov(dataAsNumber,options);
            break;
        case 4:
            results = seriesTest(dataAsNumber,options);
            break;
        default:
            console.log("No se encontro el tipo de prueba")
            break;
    }
    return results;
}

export {types,calculate}