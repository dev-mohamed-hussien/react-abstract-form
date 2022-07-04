import React, { useState } from "react";
export default function Form({ children, handleSubmit }) {
  const [error, setError] = useState(null);
  const rules = {};
  const values = {};
  const items = React.Children.map(children, (child) => {
    if (child.type.name === "Item") {
      rules[child.props.name] = child.props.rules;
      let input = React.cloneElement(child.props.children, {
        name: child.props.name,
        hold: "yes"
      });
      return React.cloneElement(child, { error }, input);
    }
    return React.cloneElement(child, {});
  });
  function validate(input) {
    let rule = rules[input?.name];
    let { value } = input;
    let { name } = input;
    const err = {};
    rule.forEach((element) => {
      if (element?.required === true && !value) {
        err[name] = { error: true, message: element?.message };
      }

      if (element?.pattern && !RegExp(element?.pattern).test(value)) {
        err[name] = { error: true, message: element?.message };
      }
    });
    //get input value
    if (!err?.[name]) {
      values[name] = value;
    }
    return err;
  }
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          let isAllOk = {};
          for (let index = 0; index < event.target.length; index++) {
            if (event.target[index].getAttribute("hold")) {
              // validate
              isAllOk = { ...isAllOk, ...validate(event.target[index]) };
              // console.log(rules[event.target[index]]);
              // console.log(event.target[index]);
            }
          }
          if (
            Object.keys(isAllOk).length == 0 &&
            handleSubmit instanceof Function
          ) {
            handleSubmit(values);
          }
          setError(isAllOk);
        }}
      >
        {items}
      </form>
    </>
  );
}

function Item({ children, name, label, error }) {
  return (
    <div>
      <div>{label}</div>
      {children}
      {error?.[name]?.error ? <div>{error?.[name]?.message}</div> : null}
    </div>
  );
}

Form.Item = Item;
