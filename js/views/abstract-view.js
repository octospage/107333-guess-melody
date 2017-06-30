import getElFromTempl from "../get-el-from-tmpl";

export default class AbstractView {
  get template() {
    throw new Error(`You have to define template for view`);
  }

  render() {
    return getElFromTempl(this.template);
  }

  postRender() {
  }

  bind() {
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.postRender();
      this.bind();
    }
    return this._element;
  }
}
