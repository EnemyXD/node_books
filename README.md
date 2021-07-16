db.library.insertMany([
{title: "title", desc: "desc", authors: "authors"},
{title: "title2", desc: "desc2", authors: "authors2"},
{title: "title3", desc: "desc3", authors: "authors3"}
])

db.library.find(
{title: { $eq: "title"}},
{title: 1, desc: 1, authors: 1}
)

db.library.updateOne(
{ _id: { $eq: ObjectId("")}},
{ $set: {title: "newTitle", desc: "newDesc", authors: "newAuthors"}}
)
