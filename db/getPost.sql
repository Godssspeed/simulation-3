SELECT posts.id,title, img, content, author_id, username,profile_pic FROM posts JOIN users ON author_id = users.id WHERE posts.id = $1