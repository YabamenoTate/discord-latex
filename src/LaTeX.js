MathJax={tex:{inlineMath:[['mthjxinline','mthjxinlineend']],displayMath:[['mthjxblock','mthjxblockend']]}};
localStorage={getItem(){},setItem(){},removeItem(){}};
require('mathjax-full/es5/tex-chtml-full');

const CLASS_SCROLLER_INNER = BdApi.Webpack.getByKeys("navigationDescription", "scrollerInner")["scrollerInner"];
const CLASS_MESSAGE_LIST_ITEM = BdApi.Webpack.getByKeys("messageListItem")["messageListItem"];
const CLASS_MESSAGE_CONTENT = BdApi.Webpack.getByKeys("messageEditorCompact", "messageContent")["messageContent"];

export default class Plugin {
  observer = null;

  start() {
    this.onSwitch();
  }

  stop() {
    if (this.observer) this.observer.disconnect();
  }

  onSwitch() {
    if (this.observer) this.observer.disconnect();
    else this.observer = new MutationObserver(this.handleMutations);

    //format existing messages and listen to new ones
    const channels = document.querySelector("." + CLASS_SCROLLER_INNER);
    if (channels) {
      //existing one
      channels.querySelectorAll("." + CLASS_MESSAGE_CONTENT).forEach(this.parseMessage);
      try {
        MathJax.typeset();
      } catch (error) {
        if (!(error instanceof TypeError)) throw error;
      }

      //new ones
      this.observer.observe(channels, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }
  }

  handleMutations = (mutationsList) => {
    let timeoutId = null; //prevents formatting before edition

    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        for (const node of mutation.addedNodes) {
          if (node.classList && node.classList.contains(CLASS_MESSAGE_CONTENT)) {
            timeoutId = setTimeout(() => {
              //unedited message
              this.formatMessage(node);
              timeoutId = null;
            }, 500);
          } else if (node.classList && node.classList.contains(CLASS_MESSAGE_LIST_ITEM)) {
            //new message
            this.formatMessage(node.querySelector("." + CLASS_MESSAGE_CONTENT));
          }
        }
      } else if (mutation.type === "characterData") {
        const messageContent = mutation.target.parentNode.closest("." + CLASS_MESSAGE_CONTENT);
        if (messageContent) {
          //edited message
          if (timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          this.formatMessage(messageContent);
        }
      }
    }
  };

  formatMessage(messageContent) {
    if (this.parseMessage(messageContent)) MathJax.typeset();
  }

  parseMessage(messageContent) {
    let containsTex = false;

    //strips code blocks and change brackets
    messageContent.querySelectorAll("code.inline").forEach((codeElement) => {
      const codeText = codeElement.innerHTML;

      if (codeText.startsWith("$$") && codeText.endsWith("$$")) {
        codeElement.outerHTML = "<span>mthjxblock" + codeText.slice(2, -2) + "mthjxblockend</span>";
        containsTex = true;
      } else if (codeText.startsWith("$") && codeText.endsWith("$")) {
        codeElement.outerHTML = "<span>mthjxinline" + codeText.slice(1, -1) + "mthjxinlineend</span>";
        containsTex = true;
      }
    });

    return containsTex;
  }
};