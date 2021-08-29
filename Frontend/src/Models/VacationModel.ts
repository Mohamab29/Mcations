class VacationModel {
  public vacationId: string;
  public description: string;
  public destination: string;
  public price: number;
  public startDate: string;
  public endDate: string;
  public imageName: string;
  public image?: FileList;
//   private properties: { [key: string]: any } = {};
//   constructor() {
//     //this is a key map for the model values because when we update a value
//     // I want to be able to reach the value of property of object type vacation model
//     this.properties = {
//       vacationId: this.vacationId,
//       description: this.description,
//       destination: this.destination,
//       price: this.price,
//       startDate: this.startDate,
//       endDate: this.endDate,
//       image: this.image,
//     };
//   }
//   public getValue(key: string) {
//     return this.properties[key];
//   }
//   public setValue(key: string, value: any) {
//       this.properties[key] = value;
//   }
}
export default VacationModel;
