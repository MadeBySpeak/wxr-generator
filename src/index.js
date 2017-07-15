const assert = require('assert');
const xmlbuilder = require('xmlbuilder');

module.exports = class Generator {
  constructor() {
    this.xml = xmlbuilder.create('rss')
      .att('xmlns:excerpt', 'http://wordpress.org/export/1.2/expert')
      .att("xmlns:content", "http://purl.org/rss/1.0/modules/content/")
      .att("xmlns:wfw", "http://wellformedweb.org/CommentAPI/")
      .att("xmlns:dc", "http://purl.org/dc/elements/1.1/")
      .att("xmlns:wp", "http://wordpress.org/export/1.2/")
      .att("version", "2.0");
    this.channel = this.xml.ele('channel');
    this.channel.ele('wp:wxr_version', {}, 1.2);
  }

  addPost() {

  }

  /**
   * id: user Id
   * username: user login name
   * email: user email
   * display_name: user nickname
   * first_name: user first name
   * last_name: user last name
   */
  addUser({id, username, email, display_name, first_name, last_name}) {
    let user = this.channel.ele('wp:author');
    user.ele('wp:author_id', {}, id);
    user.ele('wp:author_login', {}, username);
    user.ele('wp:author_email', {}, email);
    user.ele('wp:author_display_name', {}, display_name || username);
    user.ele('wp:author_first_name', {}, first_name);
    user.ele('wp:author_last_name', {}, last_name);
  }

  /**
   * id: tag Id, if not provied, random ID will be generated.
   * slug: tag slug. Used in URLS, e.g. "js-rocks"
   * name: tag title, e.g. "JS"
   * description: tag description string, default is empty.
   */
  addTag({id, slug, name, description}) {
    let tag = this.channel.ele('wp:tag');
    tag.ele('wp:term_id', {}, id || Math.floor(Math.random() * 100000));
    tag.ele('wp:tag_slug', {}, slug);
    tag.ele('wp:tag_name', {}, name);
    tag.ele('wp:tag_description', {}, description);
  }

  /**
   * id: category Id. If not provided, random ID will be generated.
   * slug: category slug. Used in URLS, e.g. "js-rocks"
   * name: category title, e.g. "Everything about JS"
   * parent_id: category parent id if it existed.
   * description: category description string, default is empty.
  */
  addCategory({id, slug, name, parent_id, description}) {
    let category = this.channel.ele('wp:category');
    category.ele('wp:term_id', {}, id || Math.floor(Math.random() * 100000));
    category.ele('wp:category_nicename', {}, slug);
    category.ele('wp:cat_name', {}, name);
    category.ele('wp:category_description', {}, '');
    if(parent_id) {
      category.ele('wp:category_parent', {}, parent_id);
    }
  }

  addAttatchment() {

  }

  addComment() {
  }

  stringify() {
    return this.xml.end({
      pretty: true, 
      indent: "    ", 
      newline: "\n"
    });
  }
}