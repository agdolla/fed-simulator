export default {
  props: {
		backgroundColor: "red",
	  color: "white",
	  links: [
		  {
		    "url": "dashboard",
		    "title": "Dashboard"
		  },
		  {
		    "url": "calendar",
		    "title": "Calendar"
		  },
		  {
		    "url": "create-a-match",
		    "title": "Create a match"
		  },
		  {
		    "url": "draft",
		    "title": "Draft"
		  },
		  {
		    "seperator": true
		  },
		  {
		    "url": "manage-roster",
		    "title": "Roster"
		  },
		  {
		    "url": "manage-brands",
		    "title": "Brands"
		  },
		  {
		    "url": "shows",
		    "title": "Shows"
		  },
		  {
		    "url": "championships",
		    "title": "Championships"
		  },
		  {
		    "seperator": true
		  },
		  {
		    "url": "settings",
		    "title": "Settings"
		  }
		],
	  modifier: "nothing",
	  name: "FS",
	  onClickBurger: (data) => console.log(data)
	}
};
