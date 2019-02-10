import JiraClient from "jira-connector";

let jira;

export async function jiraLogin({jiraLogin: username, jiraPassword: password, jiraSubdomain}) {
  jira = new JiraClient({
    host: `${jiraSubdomain}.atlassian.net`,
    basic_auth: {username, password}
  });
  if (jira) {
    return await jira.board.getAllBoards({startAt: 0});
  }
}

export async function jiraGetBacklogIssues(boardId) {
  if (jira) {
    return await jira.board.getIssuesForBacklog({boardId});
  }
}

export async function jiraGetBoardIssues(boardId) {
  if (jira) {
    return await jira.board.getIssuesForBoard({boardId});
  }
}


