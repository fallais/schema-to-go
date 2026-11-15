import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import hljs from 'highlight.js/lib/core';
import go from 'highlight.js/lib/languages/go';
import { schemaToGo } from './schema-to-go';

hljs.registerLanguage('go', go);

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly input = signal('');
  readonly inline = signal(true);
  readonly omitempty = signal(false);
  readonly copied = signal(false);

  readonly result = computed(() =>
    schemaToGo(this.input(), { inline: this.inline(), omitempty: this.omitempty() }),
  );

  readonly highlighted = computed(() => {
    const code = this.result().go;
    return code ? hljs.highlight(code, { language: 'go' }).value : '';
  });

  private copiedTimer?: ReturnType<typeof setTimeout>;

  async copyToClipboard() {
    const code = this.result().go;
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      this.copied.set(true);
      clearTimeout(this.copiedTimer);
      this.copiedTimer = setTimeout(() => this.copied.set(false), 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }
}
