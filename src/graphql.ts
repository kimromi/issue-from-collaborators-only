// see: https://docs.github.com/ja/graphql/reference/mutations#deleteissue
export const DeleteIssueMutation = `
  mutation DeleteIssue($issueId: ID!) {
    deleteIssue(input: {issueId: $issueId}) {
      clientMutationId
    }
  }
`
// see: https://docs.github.com/ja/graphql/reference/mutations#deleteissuecomment
export const DeleteIssueCommentMutation = `
  mutation DeleteIssueComment($commentId: ID!) {
    deleteIssueComment(input: {id: $commentId}) {
      clientMutationId
    }
  }
`
