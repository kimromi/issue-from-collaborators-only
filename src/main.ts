import * as core from '@actions/core'
import * as github from '@actions/github'
import {DeleteIssueCommentMutation, DeleteIssueMutation} from './graphql'

async function run(): Promise<void> {
  try {
    const {
      repo: {owner, repo},
      payload: {sender, issue, comment},
      eventName
    } = github.context
    const token = core.getInput('github_token')
    const {rest, graphql} = github.getOctokit(token)

    const {data} = await rest.repos.listCollaborators({owner, repo})
    const collaborators = data.map(({login}) => login)

    const user: string | undefined = sender?.login
    if (!user || collaborators.includes(user)) {
      core.info('issue protected.')
      return
    }

    if (eventName === 'issues' && issue) {
      await graphql(DeleteIssueMutation, {issueId: issue.node_id})
      core.info('issue deleted.')
      return
    }

    if (eventName === 'issue_comment' && comment) {
      await graphql(DeleteIssueCommentMutation, {commentId: comment.node_id})
      core.info('issue comment deleted.')
      return
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
