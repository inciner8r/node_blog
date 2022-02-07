const mongoose = require("mongoose");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);
const marked = require("marked");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizedHTML: {
    type: String,
    required: true,
  },
});

articleSchema.pre("validate", async function () {
  if (this.title) {
    this.slug = await slugify(this.title, { lower: true, strict: true });
  }

  if (this.markdown) {
    this.sanitizedHTML = await dompurify.sanitize(marked.parse(this.markdown));
  }
});

module.exports = mongoose.model("Article", articleSchema);
