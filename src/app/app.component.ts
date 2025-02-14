import { Component } from '@angular/core';
import { JSONSchemaFaker } from 'json-schema-faker';
import { JsonToGoService } from './jsontogo.service';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { HighlightModule } from 'ngx-highlightjs';
import 'highlight.js/styles/googlecode.min.css';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, HighlightModule],
  providers: [JsonToGoService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  generatedOutput: string = '';

  hasError: boolean = false;
  errorMessage: string = '';

  flatten: boolean = false;
  omitempty: boolean = false;
  input: string = '';
  constructor(private jsonToGoService: JsonToGoService) { }

  // Handle the generate button click
  generate() {
    // Reset the error message
    this.errorMessage = '';
    this.hasError = false;
    this.generatedOutput = '';

    let parsedJSON: any;
    try {
      parsedJSON = JSON.parse(this.input);
    } catch (error) {
      this.errorMessage = 'Invalid JSON';
      this.hasError = true;
      return;
    }

    // Force these options to get consistent data
    JSONSchemaFaker.option({
      useExamplesValue: true,
      alwaysFakeOptionals: true,
      optionalsProbability: 1,
      fillProperties: false,
      random: () => 0.7,
    });
    
    JSONSchemaFaker.resolve(parsedJSON).then((json) => {
      let jsonString = JSON.stringify(json, null, 2);
      const goCode = this.jsonToGoService.jsonToGo(jsonString, "", this.flatten, false, this.omitempty);
      if (goCode.error) {
        this.errorMessage = goCode.error;
        this.hasError = true;
      } else {
        this.generatedOutput = goCode.go;
      }
    });
  }

  toggleFlatten(event: Event) {
    this.flatten = !(event.target as HTMLInputElement).checked;
    this.generate();
  }

  toggleOmitempty(event: Event) {
    this.omitempty = (event.target as HTMLInputElement).checked;
    this.generate();
  }
  
  copyToClipboard() {
    if (this.generatedOutput) {
      navigator.clipboard.writeText(this.generatedOutput)
        .then(() => {
          // Optional: Add a toast or notification to show success
          console.log('Copied to clipboard');
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    }
  }
}