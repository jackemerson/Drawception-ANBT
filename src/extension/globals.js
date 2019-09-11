import getLocalStorageItem from './functions/getLocalStorageItem'
import $ from './functions/selector'

// prettier-ignore
const globals = {
  userId: getLocalStorageItem(
    'gpe_lastSeenId',
    $('.player-dropdown a[href^="/player/"]') &&
      $('.player-dropdown a[href^="/player/"]').href.match(
        /\/player\/(\d+)\//
      )[1]
  ),
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  alphabet: '36QtfkmuFds0UjlvCGIXZ125bEMhz48JSYgipwKn7OVHRBPoy9DLWaceqxANTr',
  greetings: [
    'Oruvaq lbh!',
    "Ubcr vg'f abg envavat gbqnl.",
    'Jurer vf lbhe tbq abj?',
    'Lbh fubhyq srry 5% zber cbjreshy abj.',
    'Fhqqrayl, abguvat unccrarq!',
    '^_^',
    'Guvf gnxrf fb ybat gb svavfu...',
    "Jungrire lbh qb, qba'g ernq guvf grkg.",
    'Pyvpx urer sbe 1 serr KC',
    'Or cngvrag.',
    "Whfg qba'g fgneg nal qenzn nobhg vg.",
    '47726S6Q2069732074686520677265617465737421',
    'Cynl fzneg.',
    'Cynl avpr.',
    'Fzvyr!',
    "Qba'g sbetrg gb rng.",
    "V xabj jung lbh'ir qbar.",
    'Fpvrapr!',
    'Gbqnl vf n tbbq qnl.'
  ]
}

export default globals
