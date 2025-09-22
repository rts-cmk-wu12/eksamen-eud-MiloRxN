import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
const links = {
  socials: [
    {
      name: "x",
      link: "#",
      icon: <FaXTwitter size={24}/>
    },
    {
      name: "instagram",
      link: "#",
      icon: <FaInstagram size={24} />
    },
    {
      name: "youtube",
      link: "#",
      icon: <FaYoutube size={24} />
    },
    {
      name: "linkedin",
      link: "#",
      icon: <FaLinkedin size={24} />
    }
  ],
  about: {
    heading: "About SwapHub",
    links: [
      {
        name: "How it works",
        link: "#"
      },
      {
        name: "Community guidelines",
        link: "#"
      },
      {
        name: "Our mission",
        link: "#"
      },
      {
        name: "Contact us",
        link: "#"
      }
    ]
  },
  discover: {
    heading: "Discover",
    links: [
      {
        name: "Browse categories",
        link: "#"
      },
      {
        name: "Popular Swaps",
        link: "#"
      },
      {
        name: "Successful stories",
        link: "#"
      },
      {
        name: "Upcoming events",
        link: "#"
      }
    ]
  },
  support: {
    heading: "Support",
    links: [
      {
        name: "Help Center",
        link: "#"
      },
      {
        name: "FAQs",
        link: "#"
      },
      {
        name: "Safety tips",
        link: "#"
      },
      {
        name: "Report an issue",
        link: "#"
      }
    ]
  }
}

export default links