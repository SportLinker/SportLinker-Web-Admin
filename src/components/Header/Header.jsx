import React from 'react';

export const Header = () => {
	return (
		<div style={{display: 'flex', textAlign: 'center', width: '98%', margin: 'auto'}}>
			<div
				style={{
					width: '100%',
					height: '100px',
					padding: '0px 20px',
					paddingTop: 15,
					paddingLeft: 30,
					background: 'linear-gradient(to right, #4478ff, #1f52b9)',
					borderRadius: 12,
					textAlign: 'left',
					borderBottom: '1px solid #f5f5f5',
				}}
			>
				<div
					style={{
						display: 'inline-flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
						gap: 8,
					}}
				>
					<h1
						style={{
							color: '#fff',
							textAlign: 'center',
							fontFamily: 'Inter',
							fontSize: '25px',
							fontStyle: 'normal',
							fontWeight: '600',
							lineHeight: 'normal',
							margin: 0,
						}}
					>
						Hello Admin !
					</h1>
					<h1
						style={{
							color: '#fff',
							textAlign: 'center',
							fontFamily: 'Inter',
							fontSize: '18px',
							fontStyle: 'normal',
							fontWeight: '400',
							lineHeight: '130%',
							margin: 0,
						}}
					>
						Hãy làm việc hiệu quả và tiếp tục mang lại giá trị cho cộng đồng.
					</h1>
				</div>
			</div>
		</div>
	);
};
