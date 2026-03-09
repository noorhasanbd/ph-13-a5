const API_URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

async function fetchAndRenderIssues() {
    const grid = document.getElementById('issues-grid');
    

    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        
        // Use optional chaining and default to empty array
        const issues = result?.data || [];

        if (issues.length === 0) {
            grid.innerHTML = `<p class="col-span-full text-center py-10 text-slate-400">No issues found.</p>`;
            return;
        }

        grid.innerHTML = issues.map(issue => {
            const isClosed = issue.status?.toLowerCase() === 'closed';
            const borderClass = isClosed ? 'border-t-[#A855F7]' : 'border-t-emerald-500';
            const statusImg = isClosed ? './assets/Closed-Status.png' : './assets/Open-Status.png';
            const iconBgClass = isClosed ? 'bg-purple-50 text-[#A855F7]' : 'bg-emerald-50 text-emerald-500';

            // Dynamic Priority Color Logic
            const priority = issue.priority?.toLowerCase();
            let priorityClass = 'bg-gray-50 text-gray-500'; // Default
            if (priority === 'high') priorityClass = 'bg-red-50 text-red-500';
            if (priority === 'medium') priorityClass = 'bg-orange-50 text-orange-500';
            if (priority === 'low') priorityClass = 'bg-blue-50 text-blue-500';

            return `
            <div class="flex flex-col bg-white rounded-lg shadow-sm border border-gray-100 border-t-4 ${borderClass} overflow-hidden hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start p-4 pb-2">
                    <div class="p-1 rounded-full ${iconBgClass}">
                        <div class="p-1 rounded-full ${iconBgClass}">
                            <img src="${statusImg}" alt="${issue.status}" class="w-5 h-5 object-contain">
                        </div>
                    </div>
                    <span class="px-3 py-1 text-[10px] font-bold rounded-full ${priorityClass} uppercase tracking-wide">
                        ${issue.priority}
                    </span>
                </div>

                <div class="px-4 py-2">
                    <h3 class="text-sm font-bold text-slate-800 leading-tight line-clamp-2">${issue.title}</h3>
                    <p class="mt-2 text-xs text-slate-500 line-clamp-2">${issue.description}</p>
                </div>

                <div class="flex flex-wrap gap-2 px-4 py-3">
                    ${
                      issue.labels
                        ? issue.labels
                            .map(
                              (label) => `
                        <span class="flex items-center gap-1 px-2 py-1 rounded-full bg-slate-50 text-slate-400 border border-slate-100 text-[10px] font-bold uppercase">
                            ${label}
                        </span>
                    `,
                            )
                            .join("")
                        : '<span class="text-[10px] text-slate-300">No Labels</span>'
                    }
                </div>

                <div class="mt-auto border-t border-gray-50 p-4 bg-slate-50/30">
                    <p class="text-[11px] text-slate-400">#${issue.issueId} by <span class="font-medium text-slate-600">${issue.author}</span></p>
                    <p class="text-[11px] text-slate-400 mt-1">${issue.date}</p>
                </div>
            </div>`;
        }).join('');

    } catch (error) {
        console.error("Error loading issues:", error);
        grid.innerHTML = `<div class="p-8 text-center col-span-full">
            <p class="text-red-500 font-medium">Failed to load issues.</p>
            <button onclick="fetchAndRenderIssues()" class="mt-2 text-sm text-blue-500 underline">Try again</button>
        </div>`;
    }
}

fetchAndRenderIssues();