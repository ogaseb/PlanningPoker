import JiraClient from "jira-connector";

let jira;

export function jiraLogin({jiraLogin: username, jiraPassword: password, jiraSubdomain}) {
  jira = new JiraClient({
    host: `${jiraSubdomain}.atlassian.net`,
    basic_auth: {username, password}
  });
  if (jira) {
    return jira.board.getAllBoards({startAt: 0});
  }
}

export function jiraGetBacklogIssues(boardId) {
  if (jira) {
    return jira.board.getIssuesForBacklog({boardId});
  }
}

export function jiraGetBoardIssues() {
  if (jira) {
    return jira.board.getIssuesForBoard({boardId});
  }
}


