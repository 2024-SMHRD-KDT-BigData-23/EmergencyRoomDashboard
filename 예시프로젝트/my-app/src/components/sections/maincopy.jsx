import React from 'react';
import '../../assets/scss/css.scss';

const Maincopy = () => (
  <main className="ourcontent">
    <div className="mainContent">
      <table className="table table-borderless table-striped" style={{ textAlign: 'center' }}>
        <thead>
          <tr className="#">
            <th scope="col">In time</th>
            <th scope="col">Inspection time</th>
            <th scope="col">Name</th>
            <th scope="col">Sex</th>
            <th scope="col">Acuity</th>
            <th scope="col">Temperature</th> 
            <th scope="col">HR</th>
            <th scope="col">RR</th>
            <th scope="col">SPO2</th>
            <th scope="col">nibp_s</th>
            <th scope="col">nibp_d</th>
            <th scope="col">NCDSS</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024.05.22 13:06:12</td>
            <td>2024.05.25 17:06:12</td>
            <td>홍길동</td>
            <td>M</td>
            <td>12</td>
            <td>87</td>
            <td>33</td>
            <td>22</td>
            <td>15</td>
            <td>15</td>
            <td>45</td>
            <td>ICU</td>
            <td>

                {/* 모달창 버튼 */}
              <button type="button" className="btn btn-info" data-bs-toggle="modal" style={{ color: 'white' }} data-bs-target="#exampleModal">Comment</button>
             {/* 모달창 */}
             
              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">

                  <div className="modal-content">

                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">New message</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                      <form>
                        <div className="mb-3" style={{ textAlign: 'left' }}>
                          <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
                          <div className="dropdown">
                            <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            disposition
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                              <li><a className="dropdown-item" href="#">Home</a></li>
                              <li><a className="dropdown-item" href="#">Ward</a></li>
                              <li><a className="dropdown-item" href="#">ICU</a></li>
                            </ul>
                          </div>
                        </div>

                        <div className="mb-3" style={{ textAlign: 'left' }}>
                          <label htmlFor="message-text" className="col-form-label">Comment:</label>
                          <textarea className="form-control" id="message-text"></textarea>
                        </div>

                      </form>
                    </div>

                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary">Apply</button>
                    </div>

                  </div>
                </div>
              </div>
            </td>

            

          </tr>
          
          {/* 예시 데이터 */}
          <tr>
            <td>2024.05.22 13:06:12</td>
            <td>2024.05.25 17:06:12</td>
            <td>홍길동</td>
            <td>M</td>
            <td>12</td>
            <td>87</td>
            <td>33</td>
            <td>22</td>
            <td>15</td>
            <td>15</td>
            <td>45</td>
            <td>ICU</td>
            <td>모달창 버튼</td>
          </tr>
          {/* 예시 데이터 */}
          <tr>
            <td>2024.05.22 13:06:12</td>
            <td>2024.05.25 17:06:12</td>
            <td>홍길동</td>
            <td>M</td>
            <td>12</td>
            <td>87</td>
            <td>33</td>
            <td>22</td>
            <td>15</td>
            <td>15</td>
            <td>45</td>
            <td>ICU</td>
            <td>모달창 버튼</td>
          </tr>
          {/* 예시 데이터 */}
          <tr>
            <td>2024.05.22 13:06:12</td>
            <td>2024.05.25 17:06:12</td>
            <td>홍길동</td>
            <td>M</td>
            <td>12</td>
            <td>87</td>
            <td>33</td>
            <td>22</td>
            <td>15</td>
            <td>15</td>
            <td>45</td>
            <td>ICU</td>
            <td>모달창 버튼</td>
          </tr>
          {/* 예시 데이터 */}
          <tr>
            <td>2024.05.22 13:06:12</td>
            <td>2024.05.25 17:06:12</td>
            <td>홍길동</td>
            <td>M</td>
            <td>12</td>
            <td>87</td>
            <td>33</td>
            <td>22</td>
            <td>15</td>
            <td>15</td>
            <td>45</td>
            <td>ICU</td>
            <td>모달창 버튼</td>
          </tr>
          {/* 예시 데이터 */}
          <tr>
            <td>2024.05.22 13:06:12</td>
            <td>2024.05.25 17:06:12</td>
            <td>홍길동</td>
            <td>M</td>
            <td>12</td>
            <td>87</td>
            <td>33</td>
            <td>22</td>
            <td>15</td>
            <td>15</td>
            <td>45</td>
            <td>ICU</td>
            <td>모달창 버튼</td>
          </tr>
          {/* 예시 데이터 */}
          <tr>
            <td>2024.05.22 13:06:12</td>
            <td>2024.05.25 17:06:12</td>
            <td>홍길동</td>
            <td>M</td>
            <td>12</td>
            <td>87</td>
            <td>33</td>
            <td>22</td>
            <td>15</td>
            <td>15</td>
            <td>45</td>
            <td>ICU</td>
            <td>모달창 버튼</td>
          </tr>
          {/* 예시 데이터 */}
          <tr>
            <td>2024.05.22 13:06:12</td>
            <td>2024.05.25 17:06:12</td>
            <td>홍길동</td>
            <td>M</td>
            <td>12</td>
            <td>87</td>
            <td>33</td>
            <td>22</td>
            <td>15</td>
            <td>15</td>
            <td>45</td>
            <td>ICU</td>
            <td>모달창 버튼</td>
          </tr>
          {/* 예시 데이터 */}
          <tr>
            <td>2024.05.22 13:06:12</td>
            <td>2024.05.25 17:06:12</td>
            <td>홍길동</td>
            <td>M</td>
            <td>12</td>
            <td>87</td>
            <td>33</td>
            <td>22</td>
            <td>15</td>
            <td>15</td>
            <td>45</td>
            <td>ICU</td>
            <td>모달창 버튼</td>
          </tr>
          {/* 예시 데이터 */}
          <tr>
            <td>2024.05.22 13:06:12</td>
            <td>2024.05.25 17:06:12</td>
            <td>홍길동</td>
            <td>M</td>
            <td>12</td>
            <td>87</td>
            <td>33</td>
            <td>22</td>
            <td>15</td>
            <td>15</td>
            <td>45</td>
            <td>ICU</td>
            <td>모달창 버튼</td>
          </tr>
          {/* 예시 데이터 */}
          <tr>
            <td>2024.05.22 13:06:12</td>
            <td>2024.05.25 17:06:12</td>
            <td>홍길동</td>
            <td>M</td>
            <td>12</td>
            <td>87</td>
            <td>33</td>
            <td>22</td>
            <td>15</td>
            <td>15</td>
            <td>45</td>
            <td>ICU</td>
            <td>모달창 버튼</td>
          </tr>
          {/* 예시 데이터 */}
          <tr>
            <td>2024.05.22 13:06:12</td>
            <td>2024.05.25 17:06:12</td>
            <td>홍길동</td>
            <td>M</td>
            <td>12</td>
            <td>87</td>
            <td>33</td>
            <td>22</td>
            <td>15</td>
            <td>15</td>
            <td>45</td>
            <td>ICU</td>
            <td>모달창 버튼</td>
          </tr>
          {/* 예시 데이터 */}
          <tr>
            <td>2024.05.22 13:06:12</td>
            <td>2024.05.25 17:06:12</td>
            <td>홍길동</td>
            <td>M</td>
            <td>12</td>
            <td>87</td>
            <td>33</td>
            <td>22</td>
            <td>15</td>
            <td>15</td>
            <td>45</td>
            <td>ICU</td>
            <td>모달창 버튼</td>
          </tr>
          {/* 예시 데이터 */}
          <tr>
            <td>2024.05.22 13:06:12</td>
            <td>2024.05.25 17:06:12</td>
            <td>홍길동</td>
            <td>M</td>
            <td>12</td>
            <td>87</td>
            <td>33</td>
            <td>22</td>
            <td>15</td>
            <td>15</td>
            <td>45</td>
            <td>ICU</td>
            <td>모달창 버튼</td>
          </tr>
         

        </tbody>
      </table>

    {/* 리스트 버튼 */}
      <div style={{ textAlign: 'center' }}>
        <button> &lt;&lt; </button>
        <button> 1 </button>
        <button> 2 </button>
        <button> 3 </button>
        <button> 4 </button>
        <button> 5 </button>
        <button> &gt;&gt; </button>
      </div>

    </div>
  </main>
);

export default Maincopy;
