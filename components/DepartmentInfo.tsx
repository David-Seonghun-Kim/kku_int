export default function DepartmentInfo() {
  return (
    <div className="mt-8 space-y-5">
      <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
        <h3 className="text-base font-bold text-blue-900 mb-2">📚 문헌정보학과란?</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          정보와 지식을 체계적으로 수집·정리·보존·제공하는 방법을 연구하는 학문입니다.
          도서관학과 정보과학이 결합된 복합 학문 분야로, 디지털 시대의 정보 전문가를 양성합니다.
        </p>
      </div>

      <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
        <h3 className="text-base font-bold text-green-900 mb-3">🎓 주요 교육과정</h3>
        <ul className="text-sm text-gray-700 space-y-1.5">
          <li>• 정보조직론 (분류·목록·메타데이터)</li>
          <li>• 정보검색론 (데이터베이스·검색엔진)</li>
          <li>• 도서관경영론 (도서관 운영·서비스)</li>
          <li>• 독서지도 (독서 프로그램·독서 치료)</li>
          <li>• 디지털도서관론 (전자자료·아카이브)</li>
          <li>• 정보서비스론 (이용자 서비스·레퍼런스)</li>
        </ul>
      </div>

      <div className="bg-yellow-50 rounded-2xl p-5 border border-yellow-100">
        <h3 className="text-base font-bold text-yellow-900 mb-3">💼 졸업 후 진로</h3>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
          <div className="bg-white rounded-lg p-2 text-center border border-yellow-200">공공도서관 사서</div>
          <div className="bg-white rounded-lg p-2 text-center border border-yellow-200">학교도서관 사서교사</div>
          <div className="bg-white rounded-lg p-2 text-center border border-yellow-200">대학도서관 사서</div>
          <div className="bg-white rounded-lg p-2 text-center border border-yellow-200">기업 정보센터</div>
          <div className="bg-white rounded-lg p-2 text-center border border-yellow-200">국립중앙도서관</div>
          <div className="bg-white rounded-lg p-2 text-center border border-yellow-200">IT·데이터 전문가</div>
        </div>
      </div>

      <div className="bg-purple-50 rounded-2xl p-5 border border-purple-100">
        <h3 className="text-base font-bold text-purple-900 mb-2">📞 학과 연락처</h3>
        <p className="text-sm text-gray-700">
          건국대학교 글로컬캠퍼스 문헌정보학과
          <br />
          충청북도 충주시 충원대로 268
          <br />
          인문사회관 201호
          <br />
          📧 문의: 학과 사무실 방문 또는 대학교 홈페이지 참조
        </p>
      </div>
    </div>
  );
}
