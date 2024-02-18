import React from 'react';

const Pagination = ({ currentPage, lastPage, setPage }) => {
	const setPageNumber = (number) => {
		const nextPage = currentPage + number;
		if (nextPage >= 1) {
			setPage((page) => page + number);
		}
	};

	return (
		<div className='pagination'>
			{currentPage > 2 && (
				<>
					<span className='page' onClick={() => setPage(1)}>
						1
					</span>
					{currentPage > 3 && <span>...</span>}
				</>
			)}
			{currentPage !== 1 && (
				<span className='page' onClick={() => setPageNumber(-1)}>
					{currentPage - 1}
				</span>
			)}
			<span className='page ac'>{currentPage}</span>
			{currentPage !== lastPage && (
				<>
					<span className='page' onClick={() => setPageNumber(1)}>
						{currentPage + 1}
					</span>
					{lastPage - 1 !== currentPage && (
						<>
							{lastPage - 2 !== currentPage && <span>...</span>}
							<span
								className='page'
								onClick={() => setPageNumber(lastPage - currentPage)}>
								{lastPage}
							</span>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Pagination;
