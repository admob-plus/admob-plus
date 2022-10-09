import {
  MobileAd,
  MobileAdOptions,
} from './shared'

export interface WebViewAdOptions extends MobileAdOptions {
  src?: string
  adsense: string
  npa?: '1'
}

export default class WebViewAd extends MobileAd<WebViewAdOptions> {

  private _loaded = false
  private _src = ''
  private _adsense = ''
  private _originalHref = (<any>window).location.href || ''

  constructor(opts: WebViewAdOptions) {
    opts.adUnitId = '';
    super(opts)
    this._adsense = opts.adsense
    this._src = opts.src || 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'

    if (typeof (<any>window).gmaSdk?.getQueryInfo === 'function' || typeof (<any>window).webkit?.messageHandlers?.getGmaQueryInfo?.postMessage === 'function' || typeof (<any>window).webkit?.messageHandlers?.getGmaSig?.postMessage === 'function') {
      let html = '<script async src="'+this._src+'" crossorigin="anonymous"></script>';
      if(opts.npa) {
        html += '<script>(window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1</script>';
      }
      html += '<script>(window.adsbygoogle = window.adsbygoogle || []).push({google_ad_client: "'+this._adsense+'", enable_page_level_ads: true, overlays: false});</script>';
      let div = document.createElement('div');
      div.innerHTML = html;    
      document.head.appendChild(div);
      this.nodeScriptReplace(div);
      this._loaded = true
    }
    else {
      console.error('WebView does not appear to be setup correctly');
    }

  }

  public addAd(opts: {element: HTMLElement, slot: string, format?: string, fullWidth?: boolean, html?: string}) {
    opts = {
      format: 'auto',
      fullWidth: true,
      ...opts
    };
    if (this._loaded) {
      let html = opts.html || '';
      if (!opts.html) {
        html = '<script async src="'+this._src+'" crossorigin="anonymous"></script>';
        html += '<ins class="adsbygoogle" style="display:block" data-ad-client="'+this._adsense+'" data-ad-slot="'+opts.slot+'" data-ad-format="'+opts.format+'" data-full-width-responsive="'+(opts.fullWidth ? 'true' : 'false')+'"></ins>'
        html += '<script>(window.adsbygoogle = window.adsbygoogle || []).push({});</script>';
      }
      if (opts.element) {
        opts.element.innerHTML = html;
        this.nodeScriptReplace(opts.element);
        return true;
      }
    }
    return false;
  }

  private nodeScriptReplace(node) {
    if (this.isNodeScript(node) === true) {
      node.parentNode.replaceChild(this.nodeScriptClone(node), node);
    } else {
      let children = node.childNodes;
      for (let i = 0, len = children.length; i < len; i++) {
        this.nodeScriptReplace(children[i]);
      }
    }
    return node;
  }

  private nodeScriptClone(node) {
    let script  = document.createElement('script');
    script.text = node.innerHTML;
    let attrs = node.attributes;
    for (let i = 0, len = attrs.length; i < len; i++) {
      script.setAttribute(attrs[i].name, attrs[i].value);
    }
    return script;
  }

  private isNodeScript(node) {
    return node.tagName === 'SCRIPT';
  }

  private historyReplaceState(url: string) {
    if(!this._originalHref) {
      this._originalHref = (<any>window).location.href
    }
    if(this._loaded) {
      (<any>window).history.replaceState(null, '', url)
    }
  }

  private historySetPage(page: string, parameters = {}) {
    let _parameters: string[] = []
    for(let name in parameters) {
      _parameters.push(name+'='+encodeURI(parameters[name]))
    }
    let url = page+(_parameters.length > 0 ? '?'+_parameters.join('&') : '')
    this.historyReplaceState(url)
    return url
  }

  private historyOriginalHref() {
    return this._originalHref || (<any>window).location.href
  }

  private historyCurrentHref() {
    return (<any>window).location.href
  }

  private historyRestoreOriginalHref() {
    this.historyReplaceState(this.historyOriginalHref());
  }

  public async show() {
    if (!this._loaded) {
      await this.load()
    }

    return super.show()
  }
}
