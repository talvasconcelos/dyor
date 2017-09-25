import {h, Component} from 'preact'
import style from './style'

import Hero from '../../components/hero'
import Feature from '../../components/feature'

import search from '../../assets/img/search.svg'
import networking from '../../assets/img/networking.svg'
import money from '../../assets/img/money.svg'

export default class Home extends Component {
  render() {
    return (
      <main>
        <Hero/>
        <section class='container'>
          <div class={style.features}>
            <Feature title='Research' icon={search}>
              <p>Do your own research on crypto currency before making an investment decision.</p>
            </Feature>
            <Feature title='Open Source' icon={networking}>
              <p>The articles are open sourced on GitHub so that anyone can add or edit.</p>
            </Feature>
            <Feature title='Save Time' icon={money}>
              <p>Save time and money with all relevant information in one place. </p>
            </Feature>
          </div>
        </section>
      </main>
    )
  }
}
