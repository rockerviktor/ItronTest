import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html'
})
export class UploadDataComponent {
  private httpClient: HttpClient;
  private baseUrl: string;
  private selectedFile: File;
  public uploadedCount = 0;

  constructor(httpClient: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.httpClient = httpClient;
    this.baseUrl = baseUrl;
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  public uploadData() {
    if (!this.selectedFile) {
      alert("No file was selected for upload");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.processFileContent(fileReader.result);
    }
    fileReader.readAsText(this.selectedFile);
  }

  processFileContent(fileContent: string | ArrayBuffer) {
    const lines = (<string>fileContent).split(/\r\n/);
    lines.forEach(line => {
      const fields = line.split(';');
      const forecast = {
        Date: new Date(fields[0]),
        TemperatureC: fields[1],
        Summary: fields[2]
      };
      this.uploadForecast(forecast);
    })
  }

  uploadForecast(forecast: {}) {
    this.httpClient.post(this.baseUrl + 'weatherforecast', forecast).subscribe(result => {
      this.uploadedCount++;
    }, error => console.error(error));
  }
}
