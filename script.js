function removeBlueChecks() { // check by node
  const blueChecks = document.querySelectorAll(
      '[aria-label="Verified account"]'
  );
  blueChecks && blueChecks.forEach(
      item => item.parentNode.removeChild(item)
      // item => item.parentNode.parentNode.removeChild(item.parentNode)
  );
}

const REGULAR_BLUE_CHECK_SVG = `<svg viewBox="0 0 24 24" role="img" class="r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.76z" fill="#7B5C00"></path></g></svg>`;
const TEXT_VERIFIED_LABEL = "Bronze Check";
const TEXT_ENABLED = true;
const TEXT_ENABLE_BORDER = true;

function addTwitterBrownCheck(elm, isSmall) {
  const small = REGULAR_BLUE_CHECK_SVG; // TODO: make this the brown checkmark
  const big = `
<div style='margin-left: 0.25rem; display: flex; flex-direction: row; align-items: center;${TEXT_ENABLE_BORDER ? ` border-radius: 120px; border: 1px solid #536471;` : ``} padding: 0.1rem 0.4rem 0.1rem 0.2rem; gap: 0.2rem;'>
${REGULAR_BLUE_CHECK_SVG}
<p style=' font-size: 0.8rem; margin: 0; font-weight: 600;'>${TEXT_VERIFIED_LABEL}</p>
</div>`;
  try {
      if (isSmall || !TEXT_ENABLED) {
          console.log(elm);
          elm.innerHTML = small;
      } else {
          elm.innerHTML = big;
      }
  } catch (e) {
      console.log(elm);
      throw e;
  }
}

const tweets =
  "div.css-901oao.r-xoduu5.r-18u37iz.r-1q142lx.r-37j5jr.r-16dba41.r-bcqeeo.r-qvutc0";

function getReactProps(elm) {
  const names = Object.getOwnPropertyNames(elm);
  const reactPropsName = names.find((name) =>
      name.startsWith("__reactProps")
  );
  if (!reactPropsName) {
      console.log("Couldn't find react props", node);
      return {};
  }
  const props = elm[reactPropsName];
  return props;
}

function addBrownChecks() {

}


function observe() {
  const observer = new MutationObserver((mutationsList, observer) => {
      if (mutationsList.length) {
          for (const mutation of mutationsList) {
              removeBlueChecks();

              for (const node of mutation.addedNodes) {
                  if (node.nodeType === 1) {
                      const elems = node.querySelectorAll(tweets);
                      for (const elem of elems) {
                          addTwitterBrownCheck(elem, false);
                      }
                  }
              }
          }
      }
  });

  observer.observe(document, {
      childList: true,
      subtree: true,
  });
}

function init() {
  // Start MutationObserver
  observe();
}

init();