const { Octokit } = require("@octokit/rest");

// Create an Octokit instance with authentication
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Main function to update issue on new comment
async function updateIssueOnNewComment() {
  try {
    // Get the event payload
    const payload = require(process.env.GITHUB_EVENT_PATH);
    
    // Extract necessary information from the payload

    // const commentBody = payload.comment.body;
    const commentBody = payload.comment.user.login ?? '';
    // const issueNumber = payload.issue.number;
    const issueNumber = 3;

    // const columns = await octokit.projects.listColumns({ project_id: 5 });

    // const variavel = columns;

    // process.env.TESTE = columns;

    // const column = columns.find((item) => item.title === 'Todo') || ''; 

    // await octokit.rest.projects.createCard({
    //     project.c,
    //     note,
    //     content_id,
    //     content_type,
    //   });


    // Update the issue with the new comment
    await octokit.issues.createComment({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      issue_number: issueNumber,
      body: `A new comment was added: "${commentBody}"`,
    });

    console.log("Issue updated successfully with the new comment.");
  } catch (error) {
    console.error("Error updating issue:", error);
  }
}

// Call the main function
updateIssueOnNewComment();