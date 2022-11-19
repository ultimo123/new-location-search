export const customStyles = {
  control: (provided: any) => ({
    ...provided,
    border: "1px solid #673981",
    color: "rgb(156 163 175) !important",
    boxShadow: "none",
  }),

  container: (base: any, state: any) => ({
    ...base,
    border: "1px solid rgb(107 114 128)",
    padding: "4px 0px 4px 0px",
    borderRadius: "6px",
    color: "rgb(156 ,163 ,175) !important",

    div: {
      backgroundColor: "#151C2D !important",
      border: "none",
      display: "flex",
      flexDirection: "row",
      cursor: "pointer",
      color: "rgb(156, 163, 175) !important",
    },
  }),

  input: (base: any) => ({
    ...base,
    input: {
      backgroundColor: "transparent !important",
      outline: "none",
      color: "rgb(156, 163, 175) !important",
    },
  }),
}
