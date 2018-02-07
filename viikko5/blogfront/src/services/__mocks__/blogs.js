let token = null

const blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    title: "HTML on helppoa",
    author: "Grat one",    
    url: "google.fi",
    likes: 16,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451df7571c224a31b5c8ce",
    title: "await for me train",
    author: "Potato Salado",
    url: "wikipedia.fi",
    likes: 5,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451df7571c224a31b5c8ce",
    title: "Promiset tippuvat",
    author: "beacheless",
    url: "wikipedia.fi",
    likes: 0,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }
