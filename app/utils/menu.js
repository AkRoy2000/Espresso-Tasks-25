import { list, check, methods, home, waste, cleaning } from "./Icons"; //imports icons from the icon.js file

const menu = [ //menu setup for pages
  {
    id: 1,
    title: "Home", //nav title
    icon: home, //icon name
    link: "/", //link to page
  },
  {
    id: 2,
    title: "Tasks",
    icon: list,
    link: "/pages/tasks",
  },
  {
    id: 3,
    title: "Cleaning",
    icon: cleaning,
    link: "/pages/cleaning",
  },
  {
    id: 4,
    title: "Waste",
    icon: waste,
    link: "/pages/waste",
  },
  {
    id: 5,
    title: "Methods",
    icon: methods,
    link: "/pages/methods",
  },
  {
    id: 6,
    title: "Completed",
    icon: check,
    link: "/pages/completed",
  },
];

export default menu;
