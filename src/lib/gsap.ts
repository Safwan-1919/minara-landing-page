import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function registerGSAP(): void {
  if (registered) return
  gsap.registerPlugin(ScrollTrigger)
  registered = true
}

export function getGSAP(): typeof gsap {
  return gsap
}

export function getScrollTrigger(): typeof ScrollTrigger {
  return ScrollTrigger
}
