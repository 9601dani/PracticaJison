class DateBase{
  constructor(nameTable,arrayRows) {
      this.nameTable= nameTable;
      this.arrayRows= arrayRows
  }
  mostrar() {
    console.log(`Mi nombre es ${this.nombre} y tengo ${this.objetos.length} objetos:`);
    this.objetos.forEach((objeto) => console.log(objeto));
  }
}
