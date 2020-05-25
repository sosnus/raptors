export class JVMdata {
  freeMemory: string;
  allocatedMemory: string;
  maxMemory: string;
  totalFreeMemory: string;


  constructor(freeMemory: string = '', allocatedMemory: string = '', maxMemory: string = '', totalFreeMemory: string = '') {
    this.freeMemory = freeMemory;
    this.allocatedMemory = allocatedMemory;
    this.maxMemory = maxMemory;
    this.totalFreeMemory = totalFreeMemory;
  }}

