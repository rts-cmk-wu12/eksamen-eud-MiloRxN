import Image from "next/image"
import links from "./links"

export default function Footer() {

  return (
    <footer className="p-8 pb-12 border-t-2 border-gray2 grid grid-cols-4 mt-12">
      <div className="space-y-3">
        <span className="flex items-center gap-2">
          <Image src={"/icons/logo.svg"} height={48} width={48} alt="Logo of SwapHub" />
          SwapHub
        </span>

        <ul className="flex gap-2">
          {links.socials.map(social => (
            <li key={social?.name}>
              <a href={social?.link}>
                {social?.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <ul>
        <li className="mb-2"><h2>{links.about.heading}</h2></li>
        {links.about.links.map((link, index) => (
          <li key={link.name} className={index === 0 ? '' : 'mt-1'}>
            <a href={link.link}>{link.name}</a>
          </li>
        ))}
      </ul>
      <ul>
        <li className="mb-2"><h2>{links.discover.heading}</h2></li>
        {links.discover.links.map((link, index) => (
          <li key={link.name} className={index === 0 ? '' : 'mt-1'}>
            <a href={link.link}>{link.name}</a>
          </li>
        ))}
      </ul>
      <ul>
        <li className="mb-2"><h2>{links.support.heading}</h2></li>
        {links.support.links.map((link, index) => (
          <li key={link.name} className={index === 0 ? '' : 'mt-1'}>
            <a href={link.link}>{link.name}</a>
          </li>
        ))}
      </ul>
    </footer>
  )
}