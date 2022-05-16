import * as core from '@actions/core'
import * as github from '@actions/github'
import {DeleteIssueCommentMutation, DeleteIssueMutation} from './graphql'

async function run(): Promise<void> {
  try {
    const {
      payload: {sender, issue, comment},
      eventName
    } = github.context
    const token = core.getInput('github_token')
    const {graphql} = github.getOctokit(token)
    const protectedUsers = core.getMultilineInput('protected_users')

    const user: string | undefined = sender?.login
    if (!user || protectedUsers.includes(user)) return

    if (eventName === 'issues' && issue) {
      await graphql(DeleteIssueMutation, {issueId: issue.node_id})
      core.debug('issue deleted.')
      return
    }

    if (eventName === 'issue_comment' && comment) {
      await graphql(DeleteIssueCommentMutation, {commentId: comment.node_id})
      core.debug('issue comment deleted.')
      return
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
