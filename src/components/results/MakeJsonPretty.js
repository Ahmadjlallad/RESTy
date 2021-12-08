const color = ["#8757ad", "#f9c74f", "#f9a65a", "#6c9ef8", "#dd4444"];

export default (json) => {
  const stack = [];
  const result = [];
  let isIndent = true;
  let indent = () => stack.length * 2;
  let countQuote = 0;
  let combineItem = "";
  json.split("").forEach((item, i) => {
    if (!isNaN(Number.parseInt(item)) && json[i - 1] === ":")
      return result.push(
        <span key={i} className="num">
          {" " + item}
        </span>
      );
    if (
      item === "{" ||
      item === "[" ||
      item === "," ||
      item === '"' ||
      item === ":" ||
      item === "]" ||
      item === "}"
    ) {
      if (item === "]" || item === "}") {
        stack.pop();
        const space = (
          <span
            key={i}
            style={{ color: color[stack.length > 4 ? 4 : stack.length] }}
          >
            {"\n" + "".padEnd(indent()) + item + "," + "\n"}
          </span>
        );
        result.push(space);
      }
      if (item === "{" || item === "[") {
        isIndent = true;
        const space = (
          <span
            key={i}
            style={{ color: color[stack.length > 4 ? 4 : stack.length] }}
          >
            {"".padEnd(indent()) + item + "\n"}
          </span>
        );
        stack.push(item);

        return result.push(space);
      }
      if (item === '"') {
        if (countQuote === 0) {
          countQuote += 1;
          combineItem += '"';
        } else {
          result.push(
            <span className="keys" key={i}>
              {isIndent
                ? " ".padEnd(indent()) + combineItem + '"'
                : combineItem + '"'}
            </span>
          );
          combineItem = "";
          countQuote = 0;
        }
      }
      if (item === ":" && countQuote === 0) {
        isIndent = false;
        return result.push(<span key={i}>{` ${item} `}</span>);
      }
      if (item === "," && json[i - 1] !== "}" && json[i - 1] !== "]") {
        isIndent = true;
        return result.push(<span key={i}>{item + "\n"}</span>);
      }
    } else {
      combineItem += item;
    }
  });
  return result;
};
