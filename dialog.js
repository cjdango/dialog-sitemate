class Dialog {
  static instance = null;

  constructor(triggerBtn) {
    if (Dialog.instance) return this;
    Dialog.instance = this;

    const style = document.createElement("style");
    style.innerHTML = `
      .dialog {
        position: fixed; 
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%; 
        background-color: rgba(0,0,0,0.4); 
      }

      .dialog-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
      }
    `;

    this.$triggerBtn = triggerBtn;
    this.$elem = document.createElement("div");
    this.$elem.classList.add("dialog");
    this.$elem.innerHTML = `
      <div class="dialog-content">
        <p>${triggerBtn.getAttribute("data-title")}</p>
        <button>No</button>
        <button>Yes</button>
      </div>
    `;

    const [$btnNo, $btnYes] = this.$elem.querySelectorAll("button");
    $btnNo.addEventListener("click", this.handleAction("no"));
    $btnYes.addEventListener("click", this.handleAction("yes"));

    document.head.append(style)
    document.body.appendChild(this.$elem);
  }

  handleAction(action) {
    return () => {
      this.$triggerBtn.dispatchEvent(
        new CustomEvent("settle", { detail: action })
      );

      this.$elem.remove();
      Dialog.instance = null;
    };
  }
}
