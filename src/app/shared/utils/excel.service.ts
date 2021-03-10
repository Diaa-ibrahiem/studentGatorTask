import { Injectable } from "@angular/core";
import * as XLSX from "xlsx";
import { JsonPipe } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class ExcelService {
  arrayBuffer: any;
   json: any;
  file: File;
  async fromExcelToJson(event: { target: { files: File[] } }) {
    this.file = event.target.files[0];
    this.Upload();
  }

  Upload() {
    
    let fileReader = new FileReader();
    fileReader.onloadend = e => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var exceljson = XLSX.utils.sheet_to_json(worksheet);
      if (exceljson.length > 0) {
        console.log(exceljson);
        
        this.buildData(exceljson);
        return exceljson;
      }
    };
    fileReader.readAsArrayBuffer(this.file);
  }

  private buildData(exceljson: any[]) {
    exceljson.forEach(row=>{
        Object.keys(row).forEach(headder=>{
          
          if(headder.includes(".")){
            addValueToObj(row, headder+"="+row[headder]);
            delete row[headder]
          }
        })
      })
      this.json = exceljson;
      console.log(exceljson);

  }
}
function addValueToObj(obj, newProp) {
  newProp = newProp.split("=");
  var path = newProp[0].split("."),
      val = newProp.slice(1).join("=");
  for (var i = 0, tmp = obj; i < path.length - 1; i++) {
     tmp = tmp[path[i]] = {};
  }

  tmp[path[i]] = val;
}


