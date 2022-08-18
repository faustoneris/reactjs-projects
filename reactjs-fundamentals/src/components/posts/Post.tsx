import styles from './Post.module.css'

import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Comment } from '../comments/Comment'
import { Avatar } from '../avatar/Avatar'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

type Author = {
    name: string,
    role: string,
    avatarUrl: string
}

type Content = {
    type: 'paragraph' | 'link',
    content: string;
}

type PostProps = {
    author: Author,
    publishedAt: Date,
    content: Content[]; 
}

export function Post({ author, content, publishedAt }: PostProps) {
    const [comments, setComments] = useState([
        'Post muito bacana!'
    ])

    const [newCommentsText, setNewCommentsText] = useState('')

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'ás 'HH:mm'h'", {
        locale: ptBR
    })

    const isNewCommentEmpty = newCommentsText.length === 0;

    const publishedDateRelativeNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Este campo não pode ser vazio.')
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')
        setNewCommentsText(event.target.value)
    }

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();
        setComments([...comments, newCommentsText])
        setNewCommentsText('')
    }

    function handleDeleteComment(commentToDelete: string) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment != commentToDelete;
        })

        setComments(commentsWithoutDeletedOne)
    }
    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}> {publishedDateRelativeNow}</time>
            </header>

            <div className={styles.content}>
                {
                    content.map(line => {
                        if (line.type === 'paragraph') {
                            return <p key={line.content}>{line.content}</p>
                        }
                        else if (line.type === 'link') {
                            return <p key={line.content}><a href="#">{line.content}</a></p>
                        }
                    })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea
                    name='comment'
                    placeholder='Deixe um comentario'
                    value={newCommentsText}
                    onInvalid={handleNewCommentInvalid}
                    onChange={handleNewCommentChange}
                    required
                />
                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return <Comment key={comment} content={comment} onDeleteComment={handleDeleteComment} />
                })}
            </div>
        </article>
    )
}