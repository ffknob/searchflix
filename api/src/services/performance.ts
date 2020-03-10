import apm from 'elastic-apm-node';

export const performanceMeasure = (name: string, f: Function): Promise<any> => {
  return new Promise((resolve, reject) => {
    const span = apm.startSpan(name);
    const r = f();
    if (span) span.end();

    resolve(r);
  });
};

export default medirPerformance;
