import { Component, Prop, Vue } from "vue-property-decorator";
import { VueComponent } from "../shims-vue";

import styles from "./Calc.css?module";

interface Props {}

@Component
export default class Calc extends VueComponent<Props> {
  public buffer: string = "";
  public result: string = "";
  public pending: boolean = false;

  public handleAction(action: string) {
    if (this.buffer.length === 0) return;
    const lastBufferChar = this.buffer[this.buffer.length - 1];
    if (lastBufferChar === "-" || lastBufferChar === "+") {
      if (lastBufferChar === action) return;
      this.buffer = this.buffer.slice(0, -1) + action;
      return;
    }
    this.buffer = this.buffer + action;
  }

  public handleDigitButton(digit: string) {
    const currentNumber = this.buffer.split(/\+|\-/).reverse()[0];
    if (currentNumber[0] === "0") return;
    this.buffer += digit;
  }

  public handleResetButton() {
    this.buffer = "";
    this.result = "";
  }

  public handleEqualsButton() {
    this.pending = true;
    this.result = "";
    new Promise((res, rej) => {
      const validInput = ["+", "-"].includes(this.buffer.slice(-1))
        ? this.buffer.substring(0, this.buffer.length - 1)
        : this.buffer;
      const result = eval(validInput);
      setTimeout(() => res(result), 2000);
    }).then((result) => {
      this.result = "= " + String(result);
      this.pending = false;
    });
  }

  render() {
    return (
      <div class={styles.hello}>
        <div class={styles.wrapper}>
          <div class={styles.display}>
            <div class={styles.displayLine}>
              <bdi>{this.buffer}</bdi>
            </div>
            <div class={styles.displayLine}>
              <bdi>{this.result}</bdi>
            </div>
          </div>
          <div class={styles.seven}>
            <button
              disabled={this.pending}
              class={styles.digitButton}
              onclick={() => this.handleDigitButton("7")}
            >
              7
            </button>
          </div>
          <div class={styles.eight}>
            <button
              disabled={this.pending}
              class={styles.digitButton}
              onclick={() => this.handleDigitButton("8")}
            >
              8
            </button>
          </div>
          <div class={styles.nine}>
            <button
              disabled={this.pending}
              class={styles.digitButton}
              onclick={() => this.handleDigitButton("9")}
            >
              9
            </button>
          </div>
          <div class={styles.four}>
            <button
              disabled={this.pending}
              class={styles.digitButton}
              onclick={() => this.handleDigitButton("4")}
            >
              4
            </button>
          </div>
          <div class={styles.five}>
            <button
              disabled={this.pending}
              class={styles.digitButton}
              onclick={() => this.handleDigitButton("5")}
            >
              5
            </button>
          </div>
          <div class={styles.six}>
            <button
              disabled={this.pending}
              class={styles.digitButton}
              onclick={() => this.handleDigitButton("6")}
            >
              6
            </button>
          </div>
          <div class={styles.one}>
            <button
              disabled={this.pending}
              class={styles.digitButton}
              onclick={() => this.handleDigitButton("1")}
            >
              1
            </button>
          </div>
          <div class={styles.two}>
            <button
              disabled={this.pending}
              class={styles.digitButton}
              onclick={() => this.handleDigitButton("2")}
            >
              2
            </button>
          </div>
          <div class={styles.three}>
            <button
              disabled={this.pending}
              class={styles.digitButton}
              onclick={() => this.handleDigitButton("3")}
            >
              3
            </button>
          </div>
          <div class={styles.zero}>
            <button
              disabled={this.pending}
              class={styles.digitButton}
              onclick={() => this.handleDigitButton("0")}
            >
              0
            </button>
          </div>
          <div class={styles.reset}>
            <button
              disabled={this.pending}
              class={styles.actionButton}
              onclick={() => this.handleResetButton()}
            >
              C
            </button>
          </div>
          <div class={styles.subtract}>
            <button
              disabled={this.pending}
              class={styles.actionButton}
              onclick={() => this.handleAction("-")}
            >
              -
            </button>
          </div>
          <div class={styles.add}>
            <button
              disabled={this.pending}
              class={styles.actionButton}
              onclick={() => this.handleAction("+")}
            >
              +
            </button>
          </div>
          <div class={styles.equal}>
            <button
              disabled={
                this.pending ||
                this.buffer.split(/\+|\-/).filter((x) => x.length > 0).length <
                  2
              }
              class={styles.actionButton}
              onclick={() => this.handleEqualsButton()}
            >
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}
